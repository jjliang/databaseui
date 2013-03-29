class CreateAuthorCites < ActiveRecord::Migration
  def change
    create_table :author_cites do |t|
      t.integer :author_id
      t.integer :cite_id
      t.integer :user_id

      t.timestamps
    end
  end
end
