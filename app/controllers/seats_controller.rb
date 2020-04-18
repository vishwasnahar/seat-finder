class SeatsController < ApplicationController
  def index
    detail = JSON.parse(params[:detail])
    response = SeatService.new.seat_filter(detail)
    render json: { seats: response }
  end
end
  