import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    totalHits: 0,
  };

  handleSearch = data => {
    this.setState({ images: [], page: 1, searchQuery: data, totalHits: 0 });
  };

  handleFetchImages = async () => {
    const { searchQuery, page } = this.state;

    const data = await ImageService.getImages(searchQuery, page);
    console.log(data);
    this.setState(prevState => ({
      images: [...prevState.images, ...data.photos],
      totalHits: data.total_results,
    }));
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.handleFetchImages();
    }
  }

  render() {
    const { images, totalHits } = this.state;
    return (
      <>
        <SearchForm onHandleSearch={this.handleSearch} />
        {images.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Grid>
          {images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        { images.length < totalHits &&<Button onClick={this.onClickLoadMore}>Load more</Button>}
      </>
    );
  }
}
