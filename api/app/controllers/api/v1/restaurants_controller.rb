class Api::V1::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.all
    render json: restaurants, status: :ok
  end
end
