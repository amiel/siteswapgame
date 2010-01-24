class ScoresController < ApplicationController
  def index
    @scores = Score.scoreboard
    @grouped_scores = @scores.group_by(&:score)
  end
  
  def create
    @score = Score.new(params[:score])
    respond_to do |format|
      if @score.save then
        format.html { redirect_to scores_path }
        format.js { render :nothing => true }
      else
        format.html { redirect_to scores_path }
        format.js { render :nothing => true }
      end
    end
  end
end
