#!/bin/sh
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: © 2022 Andy Alt

find maps/ \( -name '*.js' -o -name '*.json' -o -name '*.xml' \) -print0 | xargs -0 sed -i 's,other/,structures/,g'
