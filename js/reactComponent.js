window.onload = function() {
		var name = "123";
		var Hello = React.createClass({
			propTypes: {
				name: React.PropTypes.string.isRequired
			},
			getDefaultProps: function() {
				return {
					name: "GSY"
				}
			},
			render: function() {
				return <h1 > hello {
					this.props.name
				} < /h1>;
			}
		});

		ReactDOM.render( <
			Hello / > ,
			document.getElementById("component1")
		);

		var NodeList = React.createClass({
				render: function() {
					return ( < ol > {
							React.Children.map(this.props.children, function(child) {
								return <li > {
									child
								} < /li>
							})
						} <
						/ol>)
					}
				});

			ReactDOM.render( <
				NodeList >
				<
				span > hello < /span> <
				span > my love < /span>

				<
				/NodeList>,
				document.getElementById("component2")
			)
		}