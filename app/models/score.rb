class Score < ActiveRecord::Base
  def self.scoreboard
    all :order => 'score ASC, time ASC'
  end
end