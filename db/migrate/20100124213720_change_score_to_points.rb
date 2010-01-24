class ChangeScoreToPoints < ActiveRecord::Migration
  def self.up
    rename_column :scores, :score, :points
  end

  def self.down
    rename_column :scores, :points, :score
  end
end
