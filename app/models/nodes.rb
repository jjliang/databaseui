class Nodes < ActiveRecord::Base
  attr_accessible :functional_group_id, :is_assemblage, :itis_id, :non_itis_id, :user_id, :working_name
  belongs_to :functional_group, :user
end
