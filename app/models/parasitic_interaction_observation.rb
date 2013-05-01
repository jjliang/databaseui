class ParasiticInteractionObservation < ActiveRecord::Base

  OBSERVATIONS = ["field observation", "laboratory observation","chemical","gut","inferred",
  "expert opinion","fishery","nest contents","scat","forensic"]
  PARASITICS = ["pathogen","castrator","parasitoid","trophically transmitted larva"]
  ENDOECTO = ["endo","ecto"]
  LETHAL = ["benign","lethal"] 
  enum :observation_type, [:'field_observation',:'laboratory observation',:'chemical',:'gut',:'inferred',:'expert opinion',:'fishery',:'nest contents',:'scat',:'forensic']
  enum :parasite_type, [:'pathogen',:'castrator',:'parasitoid',:'trophically transmitted larva']
  enum :endo_ecto, [:'endo',:'ecto']
  enum :lethality, [:'benign',:'lethal']
  attr_accessible :citation_id, :comment, :datum, :endo_ecto, :intensity, :lethality, :location_id, :observation_type, :parasite_type, :parasitic_interaction_id, :prevalence, :user_id, :project_id, :mod, :approved
  belongs_to :citation
  belongs_to :project
  belongs_to :parasitic_interaction
  belongs_to :user
  has_one :location
end
