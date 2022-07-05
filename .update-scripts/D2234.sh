#!/bin/sh
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: © 2022 Andy Alt

find maps/ \( -name '*.js' -o -name '*.json' -o -name '*.xml' \) -print0 | xargs -0 sed -i \
  -e 's,other/palisades_rocks,structures/palisades,g' \
  -e 's,other/palisades_angle_spike,structures/palisades_spike_angle,g' \
  -e 's,other/palisades_small_spikes,structures/palisades_spikes_small,g' \
  -e 's,other/palisades_tall_spikes,structures/palisades_spikes_tall,g'
