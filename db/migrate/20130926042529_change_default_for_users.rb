class ChangeDefaultForUsers < ActiveRecord::Migration
	def up
		change_column :users, :project_id, :integer, :null => true
	end

	def down
	end
end
