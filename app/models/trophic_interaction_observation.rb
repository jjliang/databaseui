class TrophicInteractionObservation < ActiveRecord::Base
  attr_accessible :cite_id, :comment, :datum, :lethality, :location_id, :observation_type, :percentage_consumed, :percentage_diet, :percentage_diet_by, :prefernce, :structures_consumed, :trophic_interaction_id, :user_id
  belongs_to :citation
  belongs_to :trophic_interaction
  belongs_to :user
  has_one :location

end
