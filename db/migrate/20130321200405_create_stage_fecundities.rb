class CreateStageFecundities < ActiveRecord::Migration
  def change
    create_table :stage_fecundities do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.string :fecundity
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
