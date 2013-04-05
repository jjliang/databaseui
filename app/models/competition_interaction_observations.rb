class CompetitionInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :comptetition_interaction_id, :datum, :location_id, :user_id
  belongs_to :user
  belongs_to :citation
  belongs_to :comptetition_interaction
  has_one :location
end
