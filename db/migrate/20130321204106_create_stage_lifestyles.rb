class CreateStageLifestyles < ActiveRecord::Migration
  def change
    create_table :stage_lifestyles do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
