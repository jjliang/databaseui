class Forum < ActiveRecord::Base
  attr_accessible :comment, :name, :title
end
