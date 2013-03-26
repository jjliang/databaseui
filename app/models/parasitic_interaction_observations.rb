class ParasiticInteractionObservations < ActiveRecord::Base
  attr_accessible :citation_id, :comment, :datum, :intensity, :location_id, :parasitic_interaction_id, :prevalence, :user_id
  has_many :citations
  belongs_to :parasitic_interaction, :location, :user
end
