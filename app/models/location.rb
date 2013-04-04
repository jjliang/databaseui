class Location < ActiveRecord::Base
  attr_accessible :active, :lft, :name, :parent, :rgt, :visible, :z_index, :zoom_max, :zoom_min
belongs_to :user


end
