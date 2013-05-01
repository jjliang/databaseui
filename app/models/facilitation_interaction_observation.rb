class FacilitationInteractionObservation < ActiveRecord::Base
  
  OBSERVATIONS = ["field observation", "laboratory observation","chemical","gut","inferred",
  "expert opinion","fishery","nest contents","scat","forensic"]
  FACILITATIONS = ["habitat","mutualism","comensualism"]
  enum :observation_type, [:'field observation',:'laboratory observation',:'chemical',:'gut',:'inferred',:'expert opinion',:'fishery',:'nest contents',:'scat',:'forensic']
  enum :facilitation_type, [:'habitat',:'mutualism',:'comensualism']
  attr_accessible :citation_id, :comment, :datum, :facilitation_interaction_id, :facilitation_type, :location_id, :observation_type, :user_id, :project_id, :mod, :approved
  belongs_to :user
  belongs_to :project
  belongs_to :citation
  belongs_to :facilitation_interaction
  has_one :location
end
