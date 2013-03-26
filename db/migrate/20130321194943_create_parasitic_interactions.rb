class CreateParasiticInteractions < ActiveRecord::Migration
  def change
    create_table :parasitic_interactions do |t|
      t.integer :stage_1_id
      t.integer :stage_2_id
      t.integer :user_id

      t.timestamps
    end
  end
end
