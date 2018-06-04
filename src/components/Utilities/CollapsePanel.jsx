import React, { Component } from 'react';

export default class CollapsePanel extends Component {
  state = {
    collapse: false,
  }

  componentWillMount = () => this.setState(() => ({
    ...this.state,
    collapse: this.props.isCollapse,
  }));

  /**
   * toggle panel collapse
   * 
   * @memberof Index
   */
  togglePanel = () => this.setState(() => ({
    ...this.state,
    collapse: !this.state.collapse,
  }));

  render() {
    const { title, children } = this.props;
    // <article className={`message is-${panel}`}>
    return (
      <article className="message is-light" style={{ border: '1px solid #f0f0f0' }}>
        <div className="message-header has-text-centered" style={{ border: '1px solid #f0f0f0' }}>
          <h1>
            {title}
          </h1>
          <button
            className={'button is-light'}
            onClick={this.togglePanel}
          >
            <span className="icon">
              <i className={`fa ${this.state.collapse ? 'fa-minus' : 'fa-plus'}`} />
            </span>
          </button>
        </div>
        <div
          className="message-body"
          style={{
            background: '#fff',
            display: (this.state.collapse ? 'block' : 'none'),
            border: '1px solid #f0f0f0',
          }}
        >
          {children}
        </div>
      </article>
    );
  }
}
