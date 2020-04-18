class SeatsController < ApplicationController
  def index
    detail = JSON.parse(params["detail"])
    response = SeatService.seat_filter(detail)
    render json: { seats: response }
  end
end
  