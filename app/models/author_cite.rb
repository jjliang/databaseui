# Middle-man to link authors and their corresponding citations
class AuthorCite < ActiveRecord::Base
  attr_accessible :author_id, :citation_id, :user_id, :project_id, :mod , :approved
  belongs_to :author
  belongs_to :user
  belongs_to :project
  belongs_to :citation
  
  validates :author_id, :presence => true
  validates :citation_id, :presence => true
  validates :user_id, :presence => true
  validates :project_id, :presence => true
end
