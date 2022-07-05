#!/bin/sh
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: © 2022 Andy Alt

find maps/ \( -name '*.js' -o -name '*.json' -o -name '*.xml' \) -print0 | xargs -0 sed -i \
  -e 's,gaia/fauna_fish_tuna,gaia/fish/tuna,g' \
  -e 's,gaia/fauna_fish_tilapia,gaia/fish/tilapia,g' \
  -e 's,gaia/fauna_fish,gaia/fish/generic,g'
