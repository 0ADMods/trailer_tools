#!/bin/sh
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: © 2022 Andy Alt

find maps/ \( -name '*.js' -o -name '*.json' -o -name '*.xml' \) -print0 | xargs -0 sed -i \
  -e 's,gaia/flora_bush_badlands,gaia/tree/bush_badlands,g' \
  -e 's,gaia/flora_bush_temperate_winter,gaia/tree/bush_temperate_winter,g' \
  -e 's,gaia/flora_bush_temperate,gaia/tree/bush_temperate,g' \
  -e 's,gaia/flora_bush_tropic,gaia/tree/bush_tropic,g' \
  -e 's,gaia/flora_bush_berry_desert,gaia/fruit/berry_05,g' \
  -e 's,gaia/flora_bush_berry_autumn_01,gaia/fruit/berry_04,g' \
  -e 's,gaia/flora_bush_berry_03,gaia/fruit/berry_03,g' \
  -e 's,gaia/flora_bush_berry_02,gaia/fruit/berry_02,g' \
  -e 's,gaia/flora_bush_berry,gaia/fruit/berry_01,g' \
  -e 's,gaia/flora_bush_grapes,gaia/fruit/grapes,g' \
  -e 's,gaia/flora_tree_apple,gaia/fruit/apple,g' \
  -e 's,gaia/flora_tree_banana,gaia/fruit/banana,g' \
  -e 's,gaia/flora_tree_date_palm_fruit,gaia/fruit/date,g' \
  -e 's,gaia/flora_tree_fig,gaia/fruit/fig,g' \
  -e 's,gaia/flora_tree_olive,gaia/fruit/olive,g' \
  -e 's,gaia/flora_tree_,gaia/tree/,g'
