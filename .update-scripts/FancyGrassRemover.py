#!/usr/bin/env python3
# -*- mode: python-mode; python-indent-offset: 4; -*-
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: © 2022 Stanislas Daniel Claude Dolcini

from argparse import ArgumentParser
from io import BufferedReader, BufferedWriter
from logging import getLogger, StreamHandler, INFO, WARNING, Formatter, Filter
from os import path, walk
from pathlib import Path
from sys import stdout, stderr

class PmpHeader():
    def __init__(self, stream : BufferedReader):
        self.magic = int.from_bytes(stream.read(4), byteorder='little');
        self.version = int.from_bytes(stream.read(4), byteorder='little');
        self.data_size = int.from_bytes(stream.read(4), byteorder='little');
        self.map_size = int.from_bytes(stream.read(4), byteorder='little')

    def write_to_stream(self, stream : BufferedWriter):
        stream.write(self.magic.to_bytes(4, 'little'))
        stream.write(self.version.to_bytes(4, 'little'))
        stream.write(self.data_size.to_bytes(4, 'little'))
        stream.write(self.map_size.to_bytes(4, 'little'))

class PmpHeightMap(list):
    def __init__(self, stream : BufferedReader, width : int, height : int):
        self.capacity = (width * 16 + 1) * (height * 16 + 1)
        for _ in range (0, self.capacity):
            self.append(int.from_bytes(stream.read(2), byteorder='little'))

    def write_to_stream(self, stream : BufferedWriter):
        for height_data in self:
            stream.write(height_data.to_bytes(2, byteorder='little'))

class PmpTextures(list):
    def __init__(self, stream : BufferedReader):
        self.capacity = int.from_bytes(stream.read(4), byteorder='little')
        for _ in range (0, self.capacity):
            length = int.from_bytes(stream.read(4), byteorder='little');
            self.append(stream.read(length).decode())

    def write_to_stream(self, stream : BufferedWriter):
        stream.write((len(self)).to_bytes(4, byteorder='little'))
        for texture in self:
            stream.write(len(texture).to_bytes(4, byteorder='little'))
            stream.write(texture.encode())

class PmpTiles(list):
    def __init__(self, stream : BufferedReader, capacity : int):
        for _ in range(0, capacity):
            self.append(PmpTile(stream))

    def write_to_stream(self, stream : BufferedWriter):
        for tile in self:
            tile.write_to_stream(stream)

class PmpTile():
    def __init__(self, stream : BufferedReader):
        self.texture1 = int.from_bytes(stream.read(2), byteorder='little')
        self.texture2 = int.from_bytes(stream.read(2), byteorder='little')
        self.priority = int.from_bytes(stream.read(4), byteorder='little')

    def write_to_stream(self, stream : BufferedWriter):
        stream.write(self.texture1.to_bytes(2, byteorder='little'))
        stream.write(self.texture2.to_bytes(2, byteorder='little'))
        stream.write(self.priority.to_bytes(4, byteorder='little'))

class PmpPatch():
    def __init__(self, stream : BufferedReader):
        self.TILE_SIZE = 16 * 16
        self.tiles = PmpTiles(stream, self.TILE_SIZE)
    def write_to_stream(self, stream : BufferedWriter):
        self.tiles.write_to_stream(stream)

class PmpPatches(list):
    def __init__(self, stream, width, height):
        self.capacity = width * height
        for _ in range (0, self.capacity):
            self.append(PmpPatch(stream))
    def write_to_stream(self, stream : BufferedWriter):
        for patch in self:
            patch.write_to_stream(stream)

class PmpMap():
    def __init__(self, stream : BufferedReader):
        self.header = PmpHeader(stream)
        self.heightMap = PmpHeightMap(stream, self.header.map_size, self.header.map_size)
        self.textures = PmpTextures(stream)
        self.patches = PmpPatches(stream, self.header.map_size, self.header.map_size)

    def write_to_stream(self, stream : BufferedWriter):
        self.header.write_to_stream(stream)
        self.heightMap.write_to_stream(stream)
        self.textures.write_to_stream(stream)
        self.patches.write_to_stream(stream)

class SingleLevelFilter(Filter):
    def __init__(self, passlevel, reject):
        self.passlevel = passlevel
        self.reject = reject

    def filter(self, record):
        if self.reject:
            return (record.levelno != self.passlevel)
        else:
            return (record.levelno == self.passlevel)

class FancyGrassRemover():
    def __init__(self, vfs_root, verbose=False):
        self.__init_logger
        self.vfs_root = Path(vfs_root)
        self.verbose = verbose
        self.files = []
        if path.isfile(str(self.vfs_root)):
            self.files.append(self.vfs_root)
        elif path.isdir(str(self.vfs_root)):
            for root, _, files in walk(str(self.vfs_root)):
                for name in files:
                    file_path = path.join(root, name)
                    if path.isfile(file_path) and '.pmp' in name:
                        self.files.append(file_path)
        else:
            self.logger.warn("No files were found.")
            return

        self.logger.info(f"Found {len(self.files)} file(s).")

    @property
    def __init_logger(self):
        logger = getLogger(__name__)
        logger.setLevel(INFO)
        # create a console handler, seems nicer to Windows and for future uses
        ch = StreamHandler(stdout)
        ch.setLevel(INFO)
        ch.setFormatter(Formatter('%(levelname)s - %(message)s'))
        f1 = SingleLevelFilter(INFO, False)
        ch.addFilter(f1)
        logger.addHandler(ch)
        errorch = StreamHandler(stderr)
        errorch.setLevel(WARNING)
        errorch.setFormatter(Formatter('%(levelname)s - %(message)s'))
        logger.addHandler(errorch)
        self.logger = logger

    def run(self):
        for filePath in self.files:
            with open(filePath, "r+b") as f1:
                pmpMap = PmpMap(f1);
                hasChanged = False
                if (self.verbose):
                    self.logger.info(f'Parsing {filePath}')
                for textureIndex in range(0, len(pmpMap.textures)):
                    texture = pmpMap.textures[textureIndex]
                    if '_fancy' in texture:
                        pmpMap.header.data_size -= len(texture)
                        if (self.verbose):
                            self.logger.info(f'Replacing {texture} by {texture.replace("_fancy", "")}')
                        pmpMap.textures[textureIndex] = texture.replace('_fancy', '')
                        pmpMap.header.data_size += len(texture)
                        hasChanged = True
                if hasChanged:
                    self.logger.info(f"Patching {filePath}...")
                    f1.seek(0)
                    pmpMap.write_to_stream(f1)
                else:
                    f1.close()


if __name__ == '__main__':
    parser = ArgumentParser(description='Fancy grass remover.')
    parser.add_argument('-r', '--root', action='store', dest='root', default='.')
    parser.add_argument('-v', '--verbose', action='store_true', default=False, help="Be verbose.")
    args = parser.parse_args()
    remover = FancyGrassRemover(args.root, args.verbose)
    remover.run()

