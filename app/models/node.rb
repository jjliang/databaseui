class Node < ActiveRecord::Base

	 # Show action for autocomplete
  def display_node
	"#{self.working_name}"  
  end


 STATUS = %w[Native NOT_NATIVE UNDEFINED]
  attr_accessible :functional_group_id, :is_assemblage, :itis_id, :non_itis_id, :user_id, :working_name, :project_id, :mod, :approved, :native_status
  belongs_to :functional_group
  belongs_to :user
  belongs_to :project
  has_one :node_max_age
  has_one :node_range
  has_many :stages
  #has_one :non_itis, :dependent => :destroy  
  
  #validations
  validates :working_name, :presence => true
  validates :format, :presence => true
  validates :format, :presence => true
end
