class Location < ActiveRecord::Base
  attr_accessible :active, :lft, :name, :parent, :rgt, :visible, :z_index, :zoom_max, :zoom_min, :user_id, :project_id, :mod
belongs_to :user
belongs_to :competition_interaction_observation
belongs_to :facilitation_interaction_observation
belongs_to :parasitic_interaction_obseravation
belongs_to :trophic_interaction_observation
belongs_to :project

end
