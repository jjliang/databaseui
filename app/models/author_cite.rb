# Middle-man to link authors and their corresponding citations
class AuthorCite < ActiveRecord::Base
  attr_accessible :author_id, :citation_id, :user_id
  has_one :author  
  has_many :citations
  belongs_to :user
end
