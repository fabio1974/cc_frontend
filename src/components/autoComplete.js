import React, { Component } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: true,
      userInput: "",
    };
  }

  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = async (e) => {
    await this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
    this.props.onSelectItem(this.state.userInput);
  };

  onKeyDown = async (e) => {
    const { activeOption, filteredOptions } = this.state;
    console.log(e.key, this.state.userInput);

    if (
      (e.keyCode === 8 &&
        this.state.userInput &&
        this.state.userInput.length <= 1) ||
      (e.keyCode === 13 && !this.state.userInput)
    ) {
      console.log("cleaning the autocomplete");
      await this.setState({
        activeOption: 0,
        filteredOptions: [],
        showOptions: true,
        userInput: "",
      });
      this.props.onSelectItem(this.state.userInput);
    }

    if (e.keyCode === 13 && this.state.userInput.length > 0) {
      await this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption],
      });
      this.props.onSelectItem(this.state.userInput);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    let optionsListComponent;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionsListComponent = (
          <ul className="pl-0 border-1">
            {filteredOptions.map((option, index) => {
              let className = "autocomplete-item";
              if (index === activeOption)
                className = "autocomplete-item active";
              return (
                <li
                  className={className}
                  key={option}
                  onSubmit={() => console.log("on submit li")}
                  onClick={onClick}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionsListComponent = (
          <div className="autocomplete-item">
            <em>No options!</em>
          </div>
        );
      }
    }

    const { name, label } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          className="form-control"
          type="text"
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {optionsListComponent}
      </div>
    );
  }
}

export default Autocomplete;

Autocomplete.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
};
