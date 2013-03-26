class TrophicInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :location_id, :percentage_consumed, :percentage_diet, :trophic_interaction_id, :user_id
  has_many :citations
  belongs_to :trophic_interaction, :location, :user
end
