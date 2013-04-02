class Non_Iti < ActiveRecord::Base
  attr_accessible :info, :latin_name, :parent_id, :parent_id_is_itis, :taxonomy_level, :user_id
belongs_to :user
end
