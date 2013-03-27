class CreateStageLengths < ActiveRecord::Migration
  def change
    create_table :stage_lengths do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :length
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
