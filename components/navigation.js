import React, { Component, Children } from 'react'

export class Navigator extends Component {
  constructor(props) {
    super(props);
  
    this.state = { page: props.home }
  }

  render() {
    try {
    	const Page = React.Children.toArray(this.props.children)
      .filter(child => child && child.type.displayName != 'Page')
      .find(child => child.props.name === this.state.page).props.component
      return <Page navigation={page => this.setState({ page })} />
    } catch (error) {
    	throw new Error(`Couldn't find page ${this.state.page}`)
    }
  }
}

export function Page (props) {
	return ''
}
