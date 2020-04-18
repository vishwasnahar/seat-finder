require 'rails_helper'

RSpec.describe MoviesController, type: :controller do
  let(:id) { '1' }
  
  # Routes
  describe 'Routes' do
    it { expect(get: '/movies').to route_to({ controller: 'movies', action: 'index' }) }
    it { expect(post: '/movies').to route_to({ controller: 'movies', action: 'create' }) }
    it { expect(get: "/movies/#{id}").to route_to({ controller: 'movies', action: 'show', id: id }) }
    it { expect(put: "/movies/#{id}").to route_to({ controller: 'movies', action: 'update', id: id }) }
    it { expect(delete: "/movies/#{id}").to route_to({ controller: 'movies', action: 'destroy', id: id }) }
  end
  
  describe 'List all movies' do
    describe "#index", search: true do
      it 'list all movies ' do
        get :index
        expect(response.status).to be 200
      end
    end
  end

  describe 'create a movie' do
    describe "#create", search: true do
      it 'create a movie ' do
        post :create, params: {
                                movie: {title: 'My Movie', summary: 'This is my Movie',
                                year: '2020', genre: 'Fiction', imdb_link: 'https://imdb.com/my_movie'}
                              }
        expect(response.status).to be 200
      end
    end
  end

  describe 'show movie' do
    describe "#show", search: true do
      it 'show movie ' do
        get :show, params: { id: id }
        expect(response.status).to be 200
      end
    end
  end

  describe 'Update a movie' do
    describe "#update", search: true do
      it 'Update a movie ' do
        put :update, params: {  id: id,
                                movie: { title: 'My new movie', summary: 'This is my new movie',
                                year: '2022', genre: 'Action', imdb_link: 'https://imdb.com/my_new_movie'}
                              }
        expect(response.status).to be 200
      end
    end
  end

  describe 'Destroy a movie' do
    describe "#destroy", search: true do
      it 'Destroy a movie ' do
        delete :destroy, params: {  id: id }
        expect(response.status).to be 200
      end
    end
  end

end
