import React, { Component } from 'react';
import { data } from '../utils/successStoriesData';
import { maxTextForContainer } from '../utils/maxTextForContainer';

//components
import SuccessStoriesImage from './SuccessStoriesImage';
import SuccessStoriesUserTitle from './SuccessStoriesUserTitle';
import SuccessStoriesMoreBtn from './SuccessStoriesMoreBtn';

class SuccessStories extends Component{
	constructor(props){
		super(props);

		this.successExcerpt = React.createRef();
		this.currentStory = '';

		this.state = {}
	}

	//Sets this.currentStory to a random success story.
	randomStorySelector = () => {
		//sets randomNum to a number between 0 and number of success stories
		const randomNum = Math.floor(Math.random() * data.length);
		this.currentStory = data[randomNum];
	}

	//Calls maxTextForContainer to shorten string according
	//to string size. Will also add "..." after string.
	truncateExcerpt = () => {
		const newText = maxTextForContainer(this.successExcerpt, this.currentStory.excerpt);
		this.setState({
			currentExcerpt: newText
		});
	}

	updateSuccessExcerpt = (elem) => {
		return this.successExcerpt = elem;
	}

	componentDidMount(){
		this.randomStorySelector();
		window.addEventListener('resize', this.truncateExcerpt);
		this.truncateExcerpt();
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.truncateExcerpt);
	}

	render(){
		const { name, title, excerpt, imageURL, linkToStory } = this.currentStory;
		const { currentExcerpt } = this.state;

		return(
			<div id="success-stories" className="grid-container">

				{/* left section - image of person */}
				<SuccessStoriesImage 
					name={name}
					imageURL={imageURL}
				/>

				{/* right section - success story*/}
				<p className='success-header'>SUCCESS STORY</p>

				<SuccessStoriesUserTitle
					name={name}
					title={title}
				/>

				<p ref={p => this.successExcerpt = p} className="success-excerpt">
					{currentExcerpt}
				</p>

				<div className="success-btn-container">
					<SuccessStoriesMoreBtn 
						linkToStory={linkToStory}
					/>
					<div className="social-btn-container">
						<div className="social-btn">
							<a href="#">
								<i className="fab fa-twitter"></i>
							</a>
						</div>
						<div className="social-btn">
							<a href="#">
								<i className="fab fa-facebook-f"></i>
							</a>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default SuccessStories;