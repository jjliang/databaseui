class TrophicInteractionObservation < ActiveRecord::Base

  OBSERVATIONS= ["field observation", "laboratory observation","chemical","gut","inferred",
  "expert opinion","fishery","nest contents","scat","forensic"]
  LETHAL = ["lethal whole","lethal partial","nonlethal partial","nonlethal behavioural modification"]
  CONSUMED = ["whole organism","felsh","frond"]
  DIET = ["Volume","Mass","Count"]
  PREF = ["none","more preferred","less preferred"]
  enum :observation_type, [:'field_observation',:'laboratory observation',:'chemical',:'gut',:'inferred',:'expert opinion',:'fishery',:'nest contents',:'scat',:'forensic']
  enum :lethality, [:'lethal whole',:'lethal partial',:'nonlethal partial',:'nonlethal behavioural modification']
  enum :structures_consumed, [:'whole organism',:'flesh',:'frond']
  enum :percentage_diet_by, [:'Volume',:'Mass',:'Count']
  enum :preference, [:'none',:'more preferred',:'less preferred']
  attr_accessible :citation_id, :comment, :datum, :lethality, :location_id, :observation_type, :percentage_consumed, :percentage_diet, :percentage_diet_by, :preference, :structures_consumed, :trophic_interaction_id, :user_id, :project_id, :mod, :approved
  belongs_to :citation
  belongs_to :trophic_interaction
  belongs_to :user
  belongs_to :project
  has_one :location

end
