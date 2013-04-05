class FunctionalGroups < ActiveRecord::Base
  attr_accessible :name
  has_many :nodes, :dependent => :destroy
end
