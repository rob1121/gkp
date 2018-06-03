import React, { Component } from 'react';

/**
 * pagination component styling
 */
const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
};

/**
 * pagination component class
 */
export default class HandlerPagination extends Component {
  /**
     * initialize component
     */
  constructor() {
    super();

    /* pagination numbered link data */
    this.state = {
      linkList: [
        { label: 'M', page: 1 },
        { label: 'A', page: 2 },
        { label: 'X', page: 3 },
        { label: 'I', page: 4 },
        { label: 'M', page: 5 },
      ],
    };

    /* method binding */
    this.paginationButton = this.paginationButton.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  /**
     * one of react lifecycle methods that
     * fired prior props update
     *
     * @param  {Object} newProps react updated props
     */
  componentWillReceiveProps(newProps) {
    const prevCurrentPage = this.props.pagination.current_page;
    const newCurrentPage = newProps.pagination.current_page;
    const newLastPage = newProps.pagination.last_page;

    if (newCurrentPage !== prevCurrentPage) {
      /* condition if not equal execute action */
      let initPage = 0; /* initial page */
      let newLinkList = []; /* initial numbered button */

      /* multiple condition for setting button numbering */
      if (newCurrentPage > newLastPage - 2 && newLastPage >= 5) {
        initPage = newLastPage - 4;
      } else if (newCurrentPage < 3) {
        initPage = 1;
      } else {
        initPage = newCurrentPage - 2;
      }

      /* generate number of buttons */
      newLinkList = this.state.linkList.map((link) => {
        const newLink = link;
        newLink.page = initPage;
        initPage += 1;
        return newLink;
      });

      /* update state */
      this.setState({
        ...this.state,
        linkList: newLinkList,
      });
    }
  }

  /**
   * set current page
   */
  setCurrentPage(page) {
    const { pagination } = this.props;
    const currentPage = pagination.current_page;
    const lastPage = pagination.last_page;

    if (page >= 1 && page <= lastPage && page !== currentPage) {
      this.props.onPageChange(page);
    }
  }

  /**
     * generate pagination button
     */
  paginationButton() {
    const { pagination } = this.props; /* get pagination */
    const lastPage = pagination.last_page; /* get last page index */
    const currentPage = pagination.current_page; /* get first page index */
    const retVal = []; /* initial retrn value */

    /* create first page button */
    retVal.push(
      <div className="control is-expanded" key="first">
        <p>&nbsp;</p>
        <button className="button is-link" onClick={() => this.setCurrentPage(1)}>
          <span className="icon is-small">
            <i className="fa fa-angle-double-left" />
          </span>
        </button>
      </div>,
    );

    /* create prev page button */
    retVal.push(
      <div className="control is-expanded" key="prev">
        <p>&nbsp;</p>
        <button className="button is-link" onClick={() => this.setCurrentPage(currentPage - 1)}>
          <span className="icon is-small">
            <i className="fa fa-angle-left" />
          </span>
        </button>
      </div>,
    );

    /* create number page button */
    this.state.linkList.forEach(({ label, page }) => {
      let linkClass = page === currentPage ? 'has-text-primary' : '';
      linkClass += ' has-text-centered';
      retVal.push(
        <div className="control is-expanded has-text-centered" key={page}>
          <p className={linkClass}>
            {label}
          </p>
          <button className="button is-link is-current" onClick={() => this.setCurrentPage(page)}>
            <p className={linkClass}>
              {page}
            </p>
          </button>
        </div>,
      );
    });

    /* create next page button */
    retVal.push(
      <div className="control is-expanded" key="next">
        <p>&nbsp;</p>
        <button className="button is-link" onClick={() => this.setCurrentPage(currentPage + 1)}>
          <span className="icon is-small">
            <i className="fa fa-angle-right" />
          </span>
        </button>
      </div>,
    );

    /* create last page button */
    retVal.push(
      <div className="control is-expanded" key="last">
        <p>&nbsp;</p>
        <button className="button is-link" onClick={() => this.setCurrentPage(lastPage)}>
          <span className="icon is-small">
            <i className="fa fa-angle-double-right" />
          </span>
        </button>
      </div>,
    );

    return retVal;
  }

  /**
     * one of react lifecycle method with fired upon component rendering
     * return  pagination component
     */
  render() {
    return (
      <div style={styles.pagination}>
        <div className="field has-addons">
          {this.paginationButton()}
        </div>
      </div>
    );
  }
}