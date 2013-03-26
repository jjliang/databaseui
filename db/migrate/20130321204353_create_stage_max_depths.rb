class CreateStageMaxDepths < ActiveRecord::Migration
  def change
    create_table :stage_max_depths do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :max_depth
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
