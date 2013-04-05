class FacilitationInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :facilitation_interaction_id, :location_id, :user_id
  belongs_to :citation
  belongs_to :facilitation_interaction
  belongs_to :user
  has_one :location
end
