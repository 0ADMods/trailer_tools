find maps/ \( -name '*.js' -o -name '*.json' -o -name '*.xml' \) -print0 | xargs -0 sed -i \
  -e 's,gaia/fauna_crocodile,gaia/fauna_crocodile_nile,g' \
  -e 's,gaia/fauna_mastiff,gaia/fauna_dog_mastiff,g' \
  -e 's,gaia/fauna_wolfhound,gaia/fauna_dog_wolfhound,g' \
  -e 's,gaia/fauna_pony,gaia/fauna_horse_pony,g' \
  -e 's,gaia/fauna_rhino,gaia/fauna_rhinoceros_white,g' \
  -e 's,gaia/fauna_arctic_wolf,gaia/fauna_wolf_arctic,g'
