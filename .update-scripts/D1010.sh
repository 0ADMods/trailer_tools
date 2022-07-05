#!/bin/sh
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: © 2022 Andy Alt

find maps/ \( -name '*.js' -o -name '*.json' -o -name '*.xml' \) -print0 | xargs -0 sed -i \
  -e 's,gaia/geology_metal_alpine_slabs,gaia/ore/alpine_large,g' \
  -e 's,gaia/geology_metal_alpine,gaia/ore/alpine_small,g' \
  -e 's,gaia/geology_metal_desert_badlands_slabs,gaia/ore/badlands_large,g' \
  -e 's,gaia/geology_metal_desert_slabs,gaia/ore/desert_large,g' \
  -e 's,gaia/geology_metal_desert_small,gaia/ore/desert_small,g' \
  -e 's,gaia/geology_metal_greek,gaia/ore/greece_small,g' \
  -e 's,gaia/geology_metal_mediterranean_slabs,gaia/ore/mediterranean_large,g' \
  -e 's,gaia/geology_metal_mediterranean,gaia/ore/mediterranean_small,g' \
  -e 's,gaia/geology_metal_savanna_slabs,gaia/ore/savanna_large,g' \
  -e 's,gaia/geology_metal_temperate_slabs,gaia/ore/temperate_large,g' \
  -e 's,gaia/geology_metal_temperate,gaia/ore/temperate_small,g' \
  -e 's,gaia/geology_metal_tropic_slabs,gaia/ore/tropical_large,g' \
  -e 's,gaia/geology_metal_tropic,gaia/ore/tropical_small,g' \
  -e 's,gaia/geology_stone_alpine_a,gaia/rock/alpine_small,g' \
  -e 's,gaia/geology_stone_desert_quarried,gaia/rock/desert_cut,g' \
  -e 's,gaia/geology_stone_desert_small,gaia/rock/desert_small,g' \
  -e 's,gaia/geology_stone_greek,gaia/rock/greece_small,g' \
  -e 's,gaia/geology_stone_mediterranean,gaia/rock/mediterranean_small,g' \
  -e 's,gaia/geology_stone_savanna_quarried,gaia/rock/savanna_cut,g' \
  -e 's,gaia/geology_stone_savanna_small,gaia/rock/savanna_small,g' \
  -e 's,gaia/geology_stone_temperate,gaia/rock/temperate_small,g' \
  -e 's,gaia/geology_stone_tropic_a,gaia/rock/tropical_small,g' \
  -e 's,gaia/geology_stonemine_alpine_quarry,gaia/rock/alpine_large,g' \
  -e 's,gaia/geology_stonemine_desert_badlands_quarry,gaia/rock/badlands_large,g' \
  -e 's,gaia/geology_stonemine_desert_quarry,gaia/rock/desert_large,g' \
  -e 's,gaia/geology_stonemine_medit_quarry,gaia/rock/mediterranean_large,g' \
  -e 's,gaia/geology_stonemine_savanna_quarry,gaia/rock/savanna_large,g' \
  -e 's,gaia/geology_stonemine_temperate_formation,gaia/rock/temperate_large_02,g' \
  -e 's,gaia/geology_stonemine_temperate_granite_quarry,gaia/rock/temperate_large_03,g' \
  -e 's,gaia/geology_stonemine_temperate_quarry,gaia/rock/temperate_large,g' \
  -e 's,gaia/geology_stonemine_tropic_quarry,gaia/rock/tropical_large,g'
