class Score < ActiveRecord::Base
  def self.scoreboard
    # all :order => 'score ASC, time ASC'
    select = <<-SQL
      id,
      name,
      points,
      time,
      created_at,
      points/(time*1.0)*60 as points_per_minute,
      points*points/(time*1.0)*100 as score
    SQL
    
    all :select => select, :order => 'score DESC', :conditions => ['time IS NOT NULL AND time != 0 AND points != 0']
  end
end