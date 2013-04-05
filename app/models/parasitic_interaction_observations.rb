class ParasiticInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :intensity, :location_id, :parasitic_interaction_id, :prevalence, :user_id
  belongs_to :citation
  belongs_to :parasitic_interaction
  belongs_to :user
  has_one :location
end
