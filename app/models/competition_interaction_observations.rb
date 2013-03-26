class CompetitionInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :comptetition_interaction_id, :datum, :location_id, :user_id
  has_many :citations
  belongs_to :user, :location, :comptetition_interaction
end
