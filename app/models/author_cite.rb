# Middle-man to link authors and their corresponding citations
class AuthorCite < ActiveRecord::Base
  attr_accessible :author_id, :citation_id, :user_id
  belongs_to :author
  belongs_to :citation
end
