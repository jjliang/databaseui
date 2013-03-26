class FacilitationInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :facilitation_interaction_id, :location_id, :user_id
  has_many :citations
  belongs_to :facilitation_interaction, :location, :user
end
