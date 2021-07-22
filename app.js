let express = require('express'),
    _ = require('lodash'),
    bodyParser = require('body-parser');

app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
question_papers = [
    {
        'subject': 'MAT2001 - Statistics For Engineers.',
        'CAT-1': [
            'https://res.cloudinary.com/tycoon/image/upload/v1576510042/z7rfgtyi3mlvbh05jlyp.pdf',
            'https://res.cloudinary.com/tycoon/image/upload/v1576598914/l5lxjvecxcgjycxmwciz.pdf',
        ],
        'CAT-2': [
            'https://res.cloudinary.com/tycoon/image/upload/v1576653762/evzv28qepexpvmzua0dj.pdf',
            'https://res.cloudinary.com/tycoon/image/upload/v1576653778/avhwylgrjfyqmekwdv2y.pdf',
        ],
        'MTT': [

        ],
        'FAT': [

        ]
    },
    {
        'subject': 'CHY1002 - Environmental Chemistry',
        'CAT-1': [
            'https://res.cloudinary.com/tycoon/image/upload/v1576510042/z7rfgtyi3mlvbh05jlyp.pdf',
            'https://res.cloudinary.com/tycoon/image/upload/v1576598914/l5lxjvecxcgjycxmwciz.pdf',
        ],
        'CAT-2': [
            'https://res.cloudinary.com/tycoon/image/upload/v1576653762/evzv28qepexpvmzua0dj.pdf',
            'https://res.cloudinary.com/tycoon/image/upload/v1576653778/avhwylgrjfyqmekwdv2y.pdf',
        ],
        'MTT': [

        ],
        'FAT': [

        ]
    }
]

let requested = false,
    index = 0;

app.get('/', (req, res) => res.send('<h1>Home Page</h1>'));
app.get('/about', (req, res) => res.send('<h1>About Page</h1>'));
app.get('/faq', (req, res) => res.send('<h1>FAQ Page</h1>'));
app.get('/contacts', (req, res) => res.send('<h1>Contacts Page</h1>'));
app.get('/past-years', (req, res) => {
    res.render('past-years', {
        requested: requested,
        qp: question_papers[index]
    });
});

app.post('/past-years', function(req, res){
    requested = true;
    var subjectCode = req.body.subjectCode;
    for (let i = 0; i < question_papers.length; i++) {
        const element = question_papers[i];
        const sub = element.subject.substr(0, 7);
        if(sub === subjectCode){
            index = i;
            res.redirect('/past-years');
        }
    }
    res.send('<h1>Sorry Subject not available</h1>')
});

app.get('/:subject', function(req, res){
    requested = true;
    var subjectCode = req.params.subject;
    for (let i = 0; i < question_papers.length; i++) {
        const element = question_papers[i];
        const sub = element.subject.substr(0, 7);
        if(sub === subjectCode){
            index = i;
            res.redirect('/past-years');
        }
    }
    res.send('<h1>Sorry Subject not available</h1>')
});

app.listen(8080, () => console.log('Server started on port 8080.'));
