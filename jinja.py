import sys
import codecs
from jinja2 import Environment, PackageLoader, select_autoescape

input_file = sys.argv[1].replace('html_files/templates/', '')
output_file = sys.argv[2]

env = Environment(
	loader=PackageLoader('html_files', 'templates'),
	autoescape=select_autoescape(['html', 'xml'])
	)

template = env.get_template(input_file)
output = template.render()
f = codecs.open(output_file, 'w', 'utf-8')
f.write(output)
f.close()