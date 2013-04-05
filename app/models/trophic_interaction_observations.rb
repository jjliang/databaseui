class TrophicInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :location_id, :percentage_consumed, :percentage_diet, :trophic_interaction_id, :user_id
  belongs_to :citation
  belongs_to :trophic_interaction
  belongs_to :user
  has_one :location
end
