import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
  };

  handleSearch = data => {
    this.setState({ images: [], page: 1, searchQuery: data });
  };

  handleFetchImages = async () => {
    const { searchQuery, page } = this.state;

    const data = await ImageService.getImages(searchQuery, page);

    this.setState(prevState => ({
      images: [...prevState.images, ...data.photos],
    }));
  };

  componentDidUpdate() {
    this.handleFetchImages();
  }

  render() {
    return (
      <>
        <SearchForm onHandleSearch={this.handleSearch} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
