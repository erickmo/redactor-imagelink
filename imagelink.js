/*
  Add image by link plugin for Imperavi Redactor v10.x.x
  License: The MIT License (MIT) http://opensource.org/licenses/MIT
  Usage:
          $('#redactor').redactor({
            plugins: ['imagelink']
          });
*/

(function($)
{
	$.Redactor.prototype.imagelink = function()
	{
		return {
			getTemplate: function()
			{
				return String()
				+ '<section id="redactor-modal-imagelink-insert">'
					+ '<label>' + this.lang.get('imagelink_html_code') + '</label>'
					+ '<input type="text" id="redactor-insert-imagelink-area">'
				+ '</section>';
			},
			init: function()
			{
				var button = this.button.addAfter('underline', 'image', this.lang.get('imagelink'));
				this.button.addCallback(button, this.imagelink.show);
			},
			show: function()
			{
				this.modal.addTemplate('imagelink', this.imagelink.getTemplate());

				this.modal.load('imagelink', "Insert Image URL below", 700);
				this.modal.createCancelButton();

				var button = this.modal.createActionButton(this.lang.get('insert'));
				button.on('click', this.imagelink.insert);

				this.selection.save();
				this.modal.show();

				$('#redactor-insert-imagelink-area').focus();

			},
			insert: function()
			{
				var data = $('#redactor-insert-imagelink-area').val();

				data = this.clean.stripTags(data);

				// parse if it is link on youtube & vimeo
				var tagStart = '<img class="mw-100" src="',
					tagEnd = '">';

				data = tagStart + data + tagEnd;

				this.selection.restore();
				this.modal.close();
				this.insert.html(data);

				this.code.sync();
			}

		};
	};
})(jQuery);